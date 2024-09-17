import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function Pagination({ active, setActive, total, error }) {
  const next = () => {
    if (active === total) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <div className={`flex items-center gap-8 `}>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={prev}
        disabled={error ? true : active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography color="gray" className="font-normal">
        <strong className="text-gray-900">{active}</strong> of{" "}
        <strong className="text-gray-900">{total || 1}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={next}
        disabled={error ? true : active === 10}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
}
