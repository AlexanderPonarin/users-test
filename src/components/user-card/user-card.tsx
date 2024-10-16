import { Link } from 'react-router-dom';
import { UserType } from '../../types/user';

type UserCardProps = {
  user: UserType;
};

export default function UserCard({ user }: UserCardProps) {
  return (
    <li className="user-card">
      <p className="user-card__text">
        ФИО: <span className="user-card__value">{user.name}</span>
      </p>
      <p className="user-card__text">
        город: <span className="user-card__value">{user.address.city}</span>
      </p>
      <p className="user-card__text">
        компания: <span className="user-card__value">{user.company.name}</span>
      </p>
      <Link to={`/user/${user.id}`}>
        <p className="user-card__link">Подробнее</p>
      </Link>
    </li>
  );
}
