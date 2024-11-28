import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Message from '../../Message';
import Loader from '../../Loader';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../../../slices/usersApiSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserListScreen = () => {
  // Fetch current logged-in user's ID from Redux state
  const { userInfo } = useSelector((state) => state.auth);

  // Fetch users data and mutation for delete
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  // Delete handler with restriction to prevent self-deletion
  const deleteHandler = async (id) => {
    if (id === userInfo._id) {
      toast.error('You cannot delete yourself!');
      return;
    }

    if (window.confirm('Are you sure?')) {
      try {
        await deleteUser(id);
        refetch();
        toast.success('User deleted successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <Button
                    as={Link}
                    to={`/admin/user/${user._id}/edit`}
                    style={{ marginRight: '10px' }}
                    variant='light'
                    className='btn-sm'
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash style={{ color: 'white' }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
