import React from "react";

interface Props {
  heading?: string;
  headers?: { label: string; className: string }[];
  products?: { [key: string]: any }[];
  renderActions?: (product: { [key: string]: any }) => React.ReactNode;
}

const   AddDataTable: React.FC<Props> = ({
  heading,
  products,
  headers,
  renderActions,
}) => {
  return (
    <div className="sm:p-2 md:p-4">
      <div className="relative overflow-x-auto border-2 border-solid border-[#555555] shadow-md sm:rounded-lg">
        <table className="text-gray-500 dark:text-gray-400 w-full text-left text-sm rtl:text-right">
          <thead className="text-gray-700 dark:bg-gray-700 dark:text-gray-400 bg-[#555555] text-xs uppercase text-white">
            <tr>
              <th scope="col" className="px-2 py-6 text-sm">
                Sr No.
              </th>
              {headers?.map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`${header.className} text-sm`}
                >
                  {header.label.replace("_", "-")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <tr
                key={index}
                className="dark:bg-gray-800 dark:border-gray-700 dark:bg-gray-900 border-b bg-white"
              >
                <td className="px-4 py-4 text-base font-medium">{index + 1}</td>
                {headers?.map((header, headerIndex) => (
                  <td
                    key={headerIndex}
                    className="px-6 py-4 text-base font-medium"
                  >
                    {header.label === "Actions" ? (
                      <div className="flex">
                        {renderActions && renderActions(product)}
                      </div>
                    ) : header.label === "Image" && product["image"] ? (
                      <img
                        src={product["image"]}
                        alt="Product Image"
                        width={90}
                        height={90}
                      />
                    ) : header.label === "Machinery-icon" &&
                      product["machinery-icon"] ? (
                      <img
                        src={product["machinery-icon"]}
                        alt="Machinery Icon"
                        width={90}
                        height={90}
                      />
                    ) : (
                      product[header.label.toLowerCase()]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddDataTable;
