import './blog.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function BlogLayout({ children }) {
  return <><a href="#journal-main" className="blog-skip-link">Skip to journal</a><Navbar /><main id="journal-main" className="blog-shell">{children}</main><Footer /></>;
}
