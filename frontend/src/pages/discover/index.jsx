import React, { useEffect } from 'react';
import DashboardLayout from '@/layout/DashboardLayout';
import UserLayout from '@/layout/UserLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '@/config/redux/action/authAction';
import { BASE_URL } from '@/config';
import styles from "./index.module.css";
import { useRouter } from 'next/router';

export default function Discoverpage() {

  const authState = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    if(!authState.all_profiles_fetched) {
      dispatch(getAllUsers());
    }
  }, [])

  const router = useRouter();

  return (
      <UserLayout>
           <DashboardLayout>
            <div>
              <h1>Discover</h1>

              <div className={styles.allUserProfile}>
  {authState.all_profiles_fetched && authState.all_users.length > 0 ? (
    authState.all_users
      .filter(user => user?.userId && user.userId?.name) // only real users
      .map((user) => (
        <div
          onClick={() => {
            router.push(`/view_profile/${user.userId.username}`)
          }}
          key={user._id}
          className={styles.userCard}
        >
          <img
            className={styles.userCard__image}
            src={user.userId?.profilePicture
              ? `${BASE_URL}/${user.userId.profilePicture}`
              : "/default-avatar.png"}  // fallback image
            alt="profile"
          />
          <div>
            <h1>{user.userId.name}</h1>
            <p>{user.userId.username}</p>
          </div>
        </div>
      ))
  ) : (
    <p>No users found.</p>
  )}
</div>

            </div>
           </DashboardLayout>
        </UserLayout>
  )
}
