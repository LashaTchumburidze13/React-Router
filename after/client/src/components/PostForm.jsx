import { Form } from "react-router-dom"
import { FormGroup } from "./FormGroup"
import { Link } from "react-router-dom"
import { useNavigation } from "react-router-dom"
export function PostForm({ users, errors = {}, defaultValues = {} }) {
  const { state } = useNavigation()

  const isSubmit = state === "submitting"
  return (
    <Form method="post" className="form">
      <div className="form-row">
        <FormGroup errorMessage={errors.title} className="form-group">
          <label htmlFor="title">Title</label>
          <input
            defaultValue={defaultValues.title}
            type="text"
            name="title"
            id="title"
          />
        </FormGroup>
        <FormGroup errorMessage={errors.userId} className="form-group">
          <label htmlFor="userId">Author</label>
          <select name="userId" id="userId">
            {users.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              )
            })}
          </select>
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup errorMessage={errors.body}>
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea
              defaultValue={defaultValues.body}
              name="body"
              id="body"
            ></textarea>
          </div>
        </FormGroup>
      </div>
      <div className="form-row form-btn-row">
        <Link className="btn btn-outline" to="..">
          Cancel
        </Link>
        <button disabled={isSubmit} className="btn">
          {isSubmit ? "Saving" : "Save"}
        </button>
      </div>
    </Form>
  )
}

export function postFormValidator({ title, body, userId }) {
  const errors = {}

  if (title === "") {
    errors.title = "Required"
  }

  if (body === "") {
    errors.body = "Required"
  }

  if (userId === "") {
    errors.userId = "Required"
  }
  return errors
}
