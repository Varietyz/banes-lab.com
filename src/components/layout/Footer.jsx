// 📂 src/components/layout/Footer.jsx
export default function Footer() {
  return (
    <footer
      className="
        fixed
        bottom-0
        left-0
        right-0
        h-12
        bg-dark
        text-gold
        py-4
        border-t
        border-gold
        shadow-md
        z-50
      ">
      <div className="container mx-auto px-4 text-center font-body">
        &copy; {new Date().getFullYear()} Bane's Lab. All Rights Reserved.
      </div>
    </footer>
  );
}
