type TEnum<T> = {
  field: string;
  values: T[];
};

export const modifySearch = <T>({
  search,
  stringFields,
  numberFields = [],
  enumFields,
}: {
  search: string;
  stringFields?: string[];
  numberFields?: string[];
  enumFields?: TEnum<T>[];
}) => {
  const or: any[] = [];

  if (search) {
    // FOR STRING
    stringFields?.forEach((field) => {
      or.push({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      });
    });

    // FOR NUMBER
    const num = Number(search);
    if (!Number.isNaN(num)) {
      numberFields.forEach((field) => {
        or.push({
          [field]: num,
        });
      });
    }

    // FOR ENUMS
    const normalize = (value: string) =>
      value.toLowerCase().replace(/[^a-z0-9]/g, "");

    enumFields?.forEach(({ field, values }) => {
      const searchValue = normalize(search.toLowerCase());
      const matched = values.filter((v) =>
        normalize(String(v).toLowerCase()).includes(searchValue),
      );
      matched.forEach((v) => {
        or.push({
          [field]: {
            equals: String(v).toUpperCase(),
          },
        });
      });
    });
  }

  return {
    OR: or.length ? or : undefined,
  };
};
