import Link from "next/link";

export default function Footer() {
  return (
    <div className="footer">
      <div className="text">
        Designed & Powerd by{" "}
        <Link href="/">
          <a className="blog-name">Singz72</a>
        </Link>
      </div>
      <div className="text">Copyright © 2020</div>
      <a href="http://www.beian.miit.gov.cn/" className="beian">
        蜀ICP备17020743号
      </a>
      <style jsx>{`
        .footer {
          width: 100%;
          padding: 20px 0;
          background-color: #1c1e26;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #f7f7f7;
          font-size: 14px;
          z-index: 1;
        }
        .blog-name {
          text-decoration: underline;
        }
        .blog-name:hover {
          color: #ffcc00;
        }
        .beian:hover {
          color: #ffcc00;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
