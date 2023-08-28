import { useSelector } from "react-redux";
import { getUsersFilter } from "../../redux/users-selectors";
import { FilterType } from "../../redux/users_reducer";
import { Field, Form, Formik } from "formik";

const UsersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type UserSearchFormPropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type FriendFormType = {
    friend: 'null' | 'true' | 'false'
}

type FormType = {
    term: string
    friend: FriendFormType
}

export const UsersSearchForm: React.FC<UserSearchFormPropsType> = (props) => {

    const filter = useSelector(getUsersFilter)

    const onSubmit = (values: FilterType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {

        // const filter: FilterType = {
        //     term: values.term,
        //     friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        // }

        console.log(values);
        props.onFilterChanged(values);
        setSubmitting(false);

    }

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{ term: filter.term, friend: filter.friend }}
                validate={UsersSearchFormValidate}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />

                        <Field name="friend" as="select" >
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>

                        </Field>

                        <button type="submit" disabled={isSubmitting}>Search</button>
                    </Form>
                )}
            </Formik>

        </div>
    )
}