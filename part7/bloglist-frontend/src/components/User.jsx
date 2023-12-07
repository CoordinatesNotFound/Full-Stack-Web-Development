

const User = ({user}) => {
    return (
        <div>
            <div>{user.name}</div>
            <div>blogs created: {user.blogs.length}</div>
        </div>
    )
}

export default User