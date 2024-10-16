import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '../../store/redux/hooks';
import { SortingVariants } from '../../types/sorting-variants';
import { setSortingVariant } from '../../store/redux/slices/users';

export default function Layout() {
  const dispatch = useAppDispatch();

  return (
    <main className="main">
      <div className="burger-wrap">
        <input type="checkbox" id="burger-checkbox" className="burger-checkbox" />
        <label className="burger" htmlFor="burger-checkbox"></label>
        <ul className="header__menu-list burger-menu">
          <p className="sorting__title">Сортировка</p>
          <ul className="sorting__list">
            <li className="sorting__item">
              <button onClick={() => dispatch(setSortingVariant(SortingVariants.CITY))} className="sorting__button">
                по городу
              </button>
            </li>
            <li className="sorting__item">
              <button onClick={() => dispatch(setSortingVariant(SortingVariants.COMPANY))} className="sorting__button">
                по компании
              </button>
            </li>
          </ul>
        </ul>
      </div>
      <aside className="drawer">
        <div className="sorting">
          <p className="sorting__title">Сортировка</p>
          <ul className="sorting__list">
            <li className="sorting__item">
              <button onClick={() => dispatch(setSortingVariant(SortingVariants.CITY))} className="sorting__button">
                по городу
              </button>
            </li>
            <li className="sorting__item">
              <button onClick={() => dispatch(setSortingVariant(SortingVariants.COMPANY))} className="sorting__button">
                по компании
              </button>
            </li>
          </ul>
        </div>
      </aside>
      <Outlet />
    </main>
  );
}
