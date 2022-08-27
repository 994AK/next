import { Header } from './Header';
export const Layout = ({ children }) => {
  return (
    <div className="overflow-hidden">
      <Header title="YuHuaBlog" />
      <div>{children}</div>
    </div>
  );
};
