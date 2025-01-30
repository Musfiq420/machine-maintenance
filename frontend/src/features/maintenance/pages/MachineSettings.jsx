import React, { useEffect, useState } from "react";
import DashboardWrapper from "../../../shared/components/dashboard/dashboardWrapper";
import SettingsForm from "../../../shared/components/forms/settingsForm";
import DeleteModal from "../../../shared/components/ui/deleteModal";

export default function MachineSettings() {
  const baseURL = import.meta.env.VITE_URL_PREFIX;
  const [types, setTypes] = useState();
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const [supplier, setSupplier] = useState();
  const [lines, setLines] = useState();
  const [floors, setFloors] = useState();
  const [problemCategories, setProblemCategories] = useState();
  const [department, setDepartment] = useState();
  const [designations, setDesignations] = useState();
  const [activeTab, setActiveTab] = useState(null);

  const tabs = [
    {
      title: "Types",
      data: types,
      id: "types",
      link: `${baseURL}/api/maintenance/type/`,
    },
    {
      title: "Brand",
      data: brand,
      id: "brand",
      link: `${baseURL}/api/maintenance/brand/`,
    },
    {
      title: "Category",
      data: category,
      id: "category",
      link: `${baseURL}/api/maintenance/category/`,
    },
    {
      title: "Supplier",
      data: supplier,
      id: "supplier",
      link: `${baseURL}/api/maintenance/supplier/`,
    },
    {
      title: "Lines",
      data: lines,
      id: "lines",
      link: `${baseURL}/api/production/lines/`,
    },
    {
      title: "Floors",
      data: floors,
      id: "floors",
      link: `${baseURL}/api/production/lines/`,
    },
    {
      title: "Problem Categories",
      data: problemCategories,
      id: "problem-categories",
      link: `${baseURL}/api/maintenance/problem-category/`,
    },
    {
      title: "Department",
      data: department,
      id: "department",
      link: `${baseURL}/api/user_management/department/`,
    },
    {
      title: "Designations ",
      data: designations,
      id: "designations ",
      link: `${baseURL}/api/user_management/designation/`,
    },
  ];
  const flattenObject = (obj, prefix = "") => {
    let flattened = {};
    for (let key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        let nestedObj = flattenObject(obj[key], prefix + key + "_");
        Object.assign(flattened, nestedObj);
      } else if (!key.includes("company")) {
        flattened[prefix + key] = obj[key];
      }
    }
    return flattened;
  };
  const fetchAndParse = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error fetching data");
      }
      return response.json();
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      throw error;
    }
  };
  const fetchData = async () => {
    const urls = {
      types: `${baseURL}/api/maintenance/type/`,
      brand: `${baseURL}/api/maintenance/brand/`,
      category: `${baseURL}/api/maintenance/category/`,
      supplier: `${baseURL}/api/maintenance/supplier/`,
      lines: `${baseURL}/api/production/lines/`,
      floors: `${baseURL}/api/production/lines/`,
      problemCategories: `${baseURL}/api/maintenance/problem-category/`,
      department: `${baseURL}/api/user_management/department/`,
      designations: `${baseURL}/api/user_management/designation/`,
    };

    const [
      typesData,
      brandData,
      categoryData,
      supplierData,
      linesData,
      floorsData,
      problemCategoriesData,
      departmentData,
      designationsData,
    ] = await Promise.all(Object.values(urls).map(fetchAndParse));
    setTypes(typesData.map((d) => flattenObject(d)));
    setBrand(brandData.map((d) => flattenObject(d)));
    setCategory(categoryData.map((d) => flattenObject(d)));
    setSupplier(supplierData.map((d) => flattenObject(d)));
    setLines(linesData.map((d) => flattenObject(d)));
    setFloors(floorsData.map((d) => flattenObject(d)));
    setProblemCategories(problemCategoriesData.map((d) => flattenObject(d)));
    setDepartment(departmentData.map((d) => flattenObject(d)));
    setDesignations(designationsData.map((d) => flattenObject(d)));
    setActiveTab(tabs[0]);
    console.log(linesData);
  };
  const categories = {
    category_type: category,
    operation_type: [{ name: "sewing", id: "sewing" }],
    severity: [{ name: "minor", id: "minor" }],
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardWrapper>
      <div className=" flex overflow-scroll gap-2 py-5 px-3 lg:rounded-full  text-primary-dark bg-primary-accent flex-wrap justify-center text-lg font-semibold">
        {tabs.map((tab) => (
          <>
            <button
              className={`${
                tab.id === activeTab?.id
                  ? "bg-primary-dark text-white"
                  : "bg-none"
              }  rounded-full px-8 py-2 `}
              onClick={() => {
                setActiveTab(tab);
              }}
            >
              {tab.title}
            </button>
          </>
        ))}
      </div>

      <div className="text-black p-10">
        {activeTab?.data && (
          <>
            <SettingsForm categories={categories} activeTab={activeTab} />
            <table className="table-auto  w-full">
              <thead>
                <tr>
                  {Object.keys(activeTab.data[0]).map((key) => (
                    <th
                      colSpan={3}
                      className="capitalize w-[200px] pb-2 pr-12 text-left font-bold "
                    >
                      {key.replace("_", " ")}
                    </th>
                  ))}
                  <th
                    colSpan={3}
                    className="capitalize w-[200px] pb-2 pr-12 text-left font-bold "
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.values(activeTab.data).map((d) => {
                  return (
                    <tr>
                      {Object.values(d).map((d) => (
                        <td className="pb-2 w-[50px] pr-12" colSpan={3}>
                          {d}
                        </td>
                      ))}
                      <td
                        className="pb-2 w-[415px] flex gap-2 pr-12"
                        colSpan={4}
                      >
                        <DeleteModal
                          data_type={activeTab.title}
                          url={`${activeTab.link}${d.id}/`}
                          hasAccess={true}
                        />
                        <SettingsForm
                          activeTab={activeTab}
                          categories={categories}
                          currData={flattenObject(d)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </DashboardWrapper>
  );
}
