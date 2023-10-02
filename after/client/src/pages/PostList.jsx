import { useLoaderData } from "react-router-dom"
import { getPosts } from "../api/posts"
import { PostCard } from "../components/PostCard"
import { Link } from "react-router-dom"
import { useEffect, useRef } from "react"
import { getUsers } from "../api/users"
import { Form } from "react-router-dom"
import { FormGroup } from "../components/FormGroup"
function PostList() {
  const {
    posts,
    users,
    searchParams: { query, userId },
  } = useLoaderData()
  const queryRef = useRef()
  const userRef = useRef()

  useEffect(() => {
    queryRef.current.value = query || ""
  }, [query])

  useEffect(() => {
    userRef.current.value = userId || ""
  }, [userId])

  return (
    <>
      <div className="title-btns">
        <Link className="btn btn-outline" to="new">
          New
        </Link>
      </div>
      <h1 className="page-title">Posts</h1>

      <Form className="form mb-4">
        <div className="form-row">
          <FormGroup>
            <label htmlFor="query">Query</label>
            <input ref={queryRef} type="search" name="query" id="query" />
          </FormGroup>
          <FormGroup>
            <label htmlFor="userId">Author</label>
            <select ref={userRef} type="search" name="userId" id="userId">
              <option value="">Any</option>
              {users.map((user) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                )
              })}
            </select>
          </FormGroup>
          <button className="btn">Filter</button>
        </div>
      </Form>

      <div className="card-grid">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  )
}

async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams
  const query = searchParams.get("query")
  const filterParams = { q: query }
  const userId = searchParams.get("userId")
  if (userId !== "") searchParams.userId = userId
  const posts = getPosts({ signal, params: filterParams })
  const users = getUsers({ signal })
  return {
    posts: await posts,
    users: await users,
    searchParams: { query, userId },
  }
}

export const postListRoute = {
  loader,
  element: <PostList />,
}
