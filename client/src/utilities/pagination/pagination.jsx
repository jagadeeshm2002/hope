import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function Pagination({ filter, setFilter, total, error }) {
  const next = () => {
    if (filter.page === total) return;

    setFilter({ ...filter, page: filter.page + 1 });
  };

  const prev = () => {
    if (filter.page === 1) return;

    setFilter({...filter,page: filter.page - 1});
  };

  return (
    <div className={`flex items-center gap-8 `}>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={prev}
        disabled={error ? true : filter.page === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography color="gray" className="font-normal">
        <strong className="text-gray-900">{filter.page}</strong> of{" "}
        <strong className="text-gray-900">{total || 1}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={next}
        disabled={error ? true : filter.page === 10}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
}
