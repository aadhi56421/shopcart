interface StarRatingProps {
  rating: number;
}

/** Renders a compact "★ 4.5" label - avoids pulling in an icon library for one glyph. */
export function StarRating({ rating }: StarRatingProps) {
  return (
    <span className="inline-flex items-center gap-1 text-sm text-amber-600">
      <span aria-hidden="true">★</span>
      <span>{rating.toFixed(1)}</span>
    </span>
  );
}
