import { useAppSelector } from '../../store/redux/hooks';
import { RootState } from '../../store/redux/store';
import UserCard from '../../components/user-card/user-card';
import { useEffect, useState } from 'react';
import { SortingVariants } from '../../types/sorting-variants';
import { UsersType } from '../../types/user';
import { RequestStatus } from '../../types/request-status';
import Loader from '../../components/loader/loader';

export default function MainPage() {
  const users = useAppSelector((state: RootState) => state.users.users.items);
  const loadingStatus = useAppSelector((state: RootState) => state.users.users.status);
  const sortingVariant = useAppSelector((state: RootState) => state.users.sortingVariant);
  const [usersData, setUsersData] = useState<UsersType>([]);

  useEffect(() => {
    if (!users) return;
    setUsersData(users);
  }, [users]);

  useEffect(() => {
    if (!sortingVariant) return;
    const sortedUsers = [...usersData];
    if (sortingVariant === SortingVariants.CITY) {
      sortedUsers.sort((a, b) => a.address.city.localeCompare(b.address.city));
    } else if (sortingVariant === SortingVariants.COMPANY) {
      sortedUsers.sort((a, b) => a.company.name.localeCompare(b.company.name));
    }
    setUsersData(sortedUsers);
  }, [sortingVariant]);

  return (
    <div className="content">
      <h2 className="content__title">Список пользователей</h2>
      {loadingStatus === RequestStatus.LOADING && <Loader />}
      <ul className="user-list">{usersData?.map((user) => <UserCard key={user.id} user={user} />)}</ul>
      <p className="content__text-bottom">Найдено {users?.length} пользователей</p>
    </div>
  );
}
