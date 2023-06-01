import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store';
import Button from './Button'
import Skeleton from './Skeleton';
import { useThunk } from '../hooks/use-thunk';
import UsersListItem from './UserListItem';



function UserList(){
    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    const [doCreateUser, isCreatingUser, isCreatingUserError] = useThunk(addUser);


const { data } = useSelector((state) => {
    return state.users;
});

useEffect(() => {
 doFetchUsers()
}, [doFetchUsers]);

const handleUserAdd = () => {
    doCreateUser();
}

let content;

if (isLoadingUsers){
    content = <div> <Skeleton times={6} className="h-10 w-full"/></div>
}
else if (loadingUsersError){
    content = <div>Error fetching data..</div>
} else {
    content = data.map((user) => {
return <UsersListItem key={user.id} user={user} />

        // return(
        //     <div key={user.id} className="mb-2 border rounded">
        //         <div className='flex p-2 justify-between items-center cursor-point'>
        //             {user.name}
        //         </div>
        //     </div>
        // )
    })
}





    return(
        <div>
            <div className='flex flex-row justify-between items-center m-3 '>
                <h1 className='m-2 text-xl'>users</h1>
                {
                    isCreatingUser ? 'Creating User...' :
                <Button loading={ isCreatingUser } onClick={handleUserAdd}>
                    + Add User
                </Button>
                }
            {isCreatingUserError && 'error creating user...'}
            </div>
            {content}
        </div>
    ) 
}

export default UserList;