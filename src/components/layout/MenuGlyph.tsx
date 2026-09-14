interface MenuGlyphProps {
  open: boolean;
}

export default function MenuGlyph({ open }: MenuGlyphProps) {
  return (
    <span
      className={`menu-glyph ${open ? "menu-glyph--open" : ""}`}
      aria-hidden="true"
    >
      <span />
      <span />
      <span />
    </span>
  );
}
