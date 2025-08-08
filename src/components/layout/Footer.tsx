import type { FC } from "react";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer>
      <div className="container mx-auto py-4 text-center">
        <p className="text-gray-600">
          © {new Date().getFullYear()} Travel Article App
        </p>
      </div>
    </footer>
  );
};

export default Footer;
