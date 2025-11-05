import { useForm } from "react-hook-form";
import RHFSelect from "../ui/RHFSelect";

function Sort() {
  const { register, handleSubmit } = useForm();
  const sortOptions = [
    {
      title: "Newest",
      id: 1,
    },
    {
      title: "Oldest",
      id: 2,
    },
    {
      title: "Quantity",
      id: 3,
    },
  ];
  const categoryOptions = [
    {
      id: 1,
      title: "دسته بندی اول",
      desc: "first desc",
    },
    {
      id: 2,
      title: "دسته بندی دوم",
      desc: "second desc",
    },
    {
      id: 3,
      title: "دسته بندی سوم",
      desc: "third desc",
    },
    {
      id: 4,
      title: "دسته بندی چهارم",
      desc: "fourth desc",
    },
  ];

  return (
    <div className="flex items-center justify-between flex-col mb-2 py-2 px-4">
      <RHFSelect
        register={register}
        name="sort"
        additonalLabelCls="text-secondary-400 flex-1"
        additonalCls="flex items-center justify-center w-full"
        specialClass="flex-1"
        label="مرتب سازی"
        options={sortOptions}
      />
      <RHFSelect
        register={register}
        name="categorySort"
        additonalLabelCls="text-secondary-400 flex-1"
        additonalCls="flex items-center justify-center w-full"
        specialClass="flex-1"
        label="دسته بندی"
        options={categoryOptions}
      />
    </div>
  );
}

export default Sort;
