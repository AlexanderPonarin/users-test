import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <img src="./images/not-found-image.webp" alt="Not Found Image" />
      <div className="not-found__description">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>
        <Link to="/">
          <button className="not-found__button">Вернуться на главную</button>
        </Link>
      </div>
    </div>
  );
}
