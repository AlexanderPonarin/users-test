import { useParams } from 'react-router-dom';
import { RootState } from '../../store/redux/store';
import { useAppDispatch, useAppSelector } from '../../store/redux/hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { setUsers } from '../../store/redux/slices/users';
import { UserType } from '../../types/user';

interface IFormInputs {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  street: string;
  zipcode: string;
  comment: string;
  city: string;
}

export default function UserProfilePage() {
  const users = useAppSelector((state: RootState) => state.users.users.items);
  const [isEdit, setIsEdit] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>();

  useEffect(() => {
    if (id) {
      const user = users.find((user) => user.id === Number(id)) || null;
      if (user) {
        setUser(user);
      }
    }
  }, [users, id]);

  useEffect(() => {
    if (user) {
      setValue('name', user?.name);
      setValue('username', user?.username);
      setValue('email', user?.email);
      setValue('phone', user?.phone);
      setValue('website', user?.website);
      setValue('street', user?.address?.street);
      setValue('zipcode', user?.address?.zipcode);
      setValue('comment', user?.comment || '');
      setValue('city', user?.address?.city);
    }
  }, [user]);

  const onSubmit = (data: IFormInputs) => {
    try {
      const formData = {
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
        website: data.website,
        address: {
          street: data.street,
          zipcode: data.zipcode,
          city: data.city,
        },
        comment: data.comment,
      };
      const userData = { ...user, ...formData };
      const newUsers = users.map((user) => {
        if (user.id === Number(id)) {
          return userData;
        }
        return user;
      });
      console.log('new user data', userData);
      console.log('users', newUsers);

      dispatch(setUsers(newUsers));
    } catch (e) {
      console.log(e);
    } finally {
      setIsEdit(false);
    }
  };

  return (
    <div className="content">
      <div className="content__wrap">
        <p className="content__title">Профиль пользоваетля</p>
        <button onClick={() => setIsEdit(true)} className="content__button">
          Редактировать
        </button>
      </div>
      <div className="user-profile">
        <form onSubmit={handleSubmit(onSubmit)} className="user-profile__form">
          <div className="user-profile__form-fields">
            <div className="user-profile__form-item">
              <label className="user-profile__label">Name</label>
              <input
                defaultValue={user?.name}
                {...register('name', {
                  required: true,
                })}
                onChange={(e) => setValue('name', e.target.value)}
                readOnly={!isEdit}
                className={`user-profile__input ${errors.name ? 'error' : ''}`}
                type="text"
                name="name"
              />
            </div>
            <div className="user-profile__form-item">
              <label className="user-profile__label">User Name</label>
              <input
                defaultValue={user?.username}
                readOnly={!isEdit}
                {...register('username', {
                  required: true,
                })}
                className={`user-profile__input ${errors.username ? 'error' : ''}`}
                type="text"
                name="username"
              />
            </div>
            <div className="user-profile__form-item">
              <label className="user-profile__label">Email</label>
              <input
                readOnly={!isEdit}
                defaultValue={user?.email}
                {...register('email', {
                  required: true,
                })}
                className={`user-profile__input ${errors.email ? 'error' : ''}`}
                type="text"
                name="email"
              />
            </div>
            <div className="user-profile__form-item">
              <label className="user-profile__label">Street</label>
              <input
                readOnly={!isEdit}
                defaultValue={user?.address?.street}
                {...register('street', {
                  required: true,
                })}
                className={`user-profile__input ${errors.street ? 'error' : ''}`}
                type="text"
                name="street"
              />
            </div>
            <div className="user-profile__form-item">
              <label className="user-profile__label">City</label>
              <input
                readOnly={!isEdit}
                defaultValue={user?.address?.city}
                {...register('city', {
                  required: true,
                })}
                className={`user-profile__input ${errors.city ? 'error' : ''}`}
                type="text"
                name="city"
              />
            </div>
            <div className="user-profile__form-item">
              <label className="user-profile__label">Zip code</label>
              <input
                readOnly={!isEdit}
                defaultValue={user?.address?.zipcode}
                {...register('zipcode', {
                  required: true,
                })}
                className={`user-profile__input ${errors.zipcode ? 'error' : ''}`}
                type="text"
                name="zipcode"
              />
            </div>
            <div className="user-profile__form-item">
              <label className="user-profile__label">Phone</label>
              <input
                readOnly={!isEdit}
                defaultValue={user?.phone}
                {...register('phone', {
                  required: true,
                })}
                className={`user-profile__input ${errors.phone ? 'error' : ''}`}
                type="text"
                name="phone"
              />
            </div>
            <div className="user-profile__form-item">
              <label className="user-profile__label">Wevsite</label>
              <input
                readOnly={!isEdit}
                {...register('website', {
                  required: true,
                })}
                defaultValue={user?.website}
                className={`user-profile__input ${errors.website ? 'error' : ''}`}
                type="text"
                name="website"
              />
            </div>
            <div className="user-profile__form-item comment">
              <label className="user-profile__label">Comment</label>
              <textarea
                readOnly={!isEdit}
                defaultValue={user?.comment}
                {...register('comment')}
                className="user-profile__input comment"
                name="comment"
              />
            </div>
          </div>
          <button disabled={!isEdit} type="submit" className="user-profile__button">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}
