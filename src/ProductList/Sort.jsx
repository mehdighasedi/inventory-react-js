import Select from "../ui/Select";

function Sort({ category, sortOption, selectedCategory, onSortChange, onCategoryChange }) {
  const sortOptions = [
    { id: "latest", title: "جدیدترین" },
    { id: "oldest", title: "قدیمی‌ترین" },
    { id: "quantity", title: "تعداد" },
  ];

  const categoryOptions = [
    { id: "all", title: "همه دسته‌ها" },
    ...category.map((category) => ({
      id: String(category.id),
      title: category.title,
    })),
  ];

  return (
    <div className="flex flex-col gap-3 mb-2 py-2 px-4">
      <Select
        name="sort"
        label="مرتب‌سازی"
        defaultText="یک گزینه را انتخاب کنید"
        options={sortOptions}
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        additonalCls="flex items-center justify-center w-full"
        specialClass="flex-1"
        additonalLabelCls="text-secondary-0 flex-1"
      />

      <Select
        name="categorySort"
        label="دسته‌بندی"
        defaultText="یک گزینه را انتخاب کنید"
        options={categoryOptions}
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        additonalCls="flex items-center justify-center w-full"
        specialClass="flex-1"
        additonalLabelCls="text-secondary-0 flex-1"
      />
    </div>
  );
}

export default Sort;
