import React, { useEffect, useState } from "react";
import DashboardWrapper from "../../../shared/components/dashboard/dashboardWrapper";
import SettingsForm from "../../../shared/components/forms/settingsForm";
import DeleteModal from "../../../shared/components/ui/deleteModal";

export default function MachineSettings() {
  const baseURL = import.meta.env.VITE_URL_PREFIX;
  const [type, setType] = useState();
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const [supplier, setSupplier] = useState();
  const [lines, setLines] = useState();
  const [floors, setFloors] = useState();
  const [problemCategories, setProblemCategories] = useState();
  const [problemType, setProblemType] = useState();
  const [department, setDepartment] = useState();
  const [designations, setDesignations] = useState();
  const tabs = [
    {
      title: "Type",
      data: type,
      id: "type",
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
    // {
    //   title: "Lines",
    //   data: lines,
    //   id: "lines",
    //   link: `${baseURL}/api/production/lines/`,
    // },
    // {
    //   title: "Floors",
    //   data: floors,
    //   id: "floors",
    //   link: `${baseURL}/api/production/lines/`,
    // },
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
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [success, setSuccess] = useState(false);

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
      type: `${baseURL}/api/maintenance/type/`,
      brand: `${baseURL}/api/maintenance/brand/`,
      category: `${baseURL}/api/maintenance/category/`,
      supplier: `${baseURL}/api/maintenance/supplier/`,
      lines: `${baseURL}/api/production/lines/`,
      floors: `${baseURL}/api/production/lines/`,
      problemCategories: `${baseURL}/api/maintenance/problem-category/`,
      problemType: `${baseURL}/api/maintenance/problem-category-type/`,
      department: `${baseURL}/api/user_management/department/`,
      designations: `${baseURL}/api/user_management/designation/`,
    };

    const [
      typeData,
      brandData,
      categoryData,
      supplierData,
      linesData,
      floorsData,
      problemCategoriesData,
      problemTypesData,

      departmentData,
      designationsData,
    ] = await Promise.all(Object.values(urls).map(fetchAndParse));
    setType(typeData.map((d) => flattenObject(d)));
    setBrand(brandData.map((d) => flattenObject(d)));
    setCategory(categoryData.map((d) => flattenObject(d)));

    setSupplier(supplierData.map((d) => flattenObject(d)));
    setLines(linesData.map((d) => flattenObject(d)));
    setFloors(floorsData.map((d) => flattenObject(d)));

    setProblemCategories(problemCategoriesData.map((d) => flattenObject(d)));
    setProblemType(problemTypesData.map((d) => flattenObject(d)));
    setDepartment(departmentData.map((d) => flattenObject(d)));
    setDesignations(designationsData.map((d) => flattenObject(d)));
  };
  const categories = {
    category_type: problemType,
    operation_type: [{ name: "sewing", id: "sewing" }],
    severity: [{ name: "minor", id: "minor" }],
    department: department,
  };
  useEffect(() => {
    if (success) {
      fetchData();
      setSuccess(false);
    }
  }, [success]);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    setActiveTab(tabs[0]);
  }, [type]);

  const getWidth = (key) => {
    return key == "name"
      ? ""
      : key.includes("id")
      ? "w-[80px]"
      : key.includes("description")
      ? "w-[280px]"
      : "w-[150px]";
  };

  return (
    <DashboardWrapper>
      <div className=" w-fit mx-auto flex overflow-scroll gap-2 py-2 px-3 lg:rounded-full  text-primary-dark bg-primary-dark flex-wrap justify-center text-lg font-semibold">
        {tabs.map((tab) => (
          <>
            <button
              className={`${
                tab.id === activeTab?.id
                  ? "bg-primary-light text-white"
                  : "bg-none text-white"
              }  rounded-full text-[16px] px-6 py-1 `}
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
            <SettingsForm
              setSuccess={setSuccess}
              categories={categories}
              activeTab={activeTab}
            />
            <div className="overflow-auto">
              <table className="my-20  w-full">
                <thead>
                  <tr className="bg-primary-accent   text-black font-semibold text-sm">
                    {Object.keys(activeTab.data[0]).map((key) => (
                      <th
                        className={`capitalize  ${getWidth(
                          key
                        )} p-3 text-left font-bold `}
                      >
                        {key.replace("_", " ")}
                      </th>
                    ))}
                    <th className="capitalize w-[150px]  p-3 pr-12 text-left font-bold ">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(activeTab.data).map((d, index) => {
                    return (
                      <tr
                        className={`border-b-2 ${
                          index % 2 != 0 ? "bg-gray-100" : "bg-white"
                        } border-gray-300`}
                      >
                        {Object.entries(d).map((d) => {
                          return (
                            <td
                              className={`${getWidth(d[0])} align-middle p-3`}
                            >
                              {categories[d[0]]?.find((c) => c.id == d[1])
                                ?.name || d[1]}
                            </td>
                          );
                        })}
                        <td className="p-3 w-[420px] items-center h-full flex gap-2 ">
                          <DeleteModal
                            data_type={activeTab.title}
                            url={`${activeTab.link}${d.id}/`}
                            hasAccess={true}
                            success={success}
                            setSuccess={setSuccess}
                          />
                          <SettingsForm
                            setSuccess={setSuccess}
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
            </div>
          </>
        )}
      </div>
    </DashboardWrapper>
  );
}
