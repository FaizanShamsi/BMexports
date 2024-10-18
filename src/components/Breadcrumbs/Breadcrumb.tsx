import Link from "next/link";
import { useRouter } from "next/navigation";

interface BreadcrumbProps {
  pageName: string;
  pathname?: string;
}

const Breadcrumb = ({ pageName, pathname }: BreadcrumbProps) => {
  const router = useRouter();
  const renderButton = pathname?.endsWith("-list");
  let addButtonRoute = "";

  if (pathname && pathname.endsWith("-list")) {
    addButtonRoute = `/carstock/add-new-${pathname.slice(0, -5)}`;
    console.log(addButtonRoute);
  }

  const handleButtonClick = () => {
    router.push(addButtonRoute);
  };
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-6">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {pageName}
        </h2>
        {renderButton && (
          <button
            onClick={handleButtonClick}
            className="rounded bg-slate-500 px-6 py-1 font-bold text-white hover:bg-slate-800"
          >
            Add {pathname?.slice(0, -5)}
          </button>
        )}
      </div>
      {pathname !== "" && (
        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <Link className="font-medium text-[#000]" href="/">
                Dashboard /
              </Link>
            </li>
            <li className="font-medium text-red">{pathname}</li>
          </ol>
        </nav>
      )}
    </div>
  );
};

export default Breadcrumb;
