
export default function UserDashbord(params) {
    
    return(
        <div className="underTaker">
            <div className="userDhaboard">
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <td>S. No.</td>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Jackal_3221</td>
                                <td>jackal@gmail.com</td>
                                <td>John Wick</td>
                                <td><button>Delete</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}