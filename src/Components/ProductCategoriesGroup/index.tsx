import React from 'react';
import { ProductCategory, useProductCategories } from '@/Models/Enums';
import { Checkbox } from 'antd';
import { Text } from '../_Common';
import { useState } from 'react';
import { useEffect } from 'react';
import './styles.scss';

type Props = {
  onChange: (values: ProductCategory[]) => void;
  needSelectAll?: boolean;
};

export const ProductCategoriesGroup = ({ onChange, needSelectAll }: Props): React.ReactElement => {
  const productCategories = useProductCategories();

  const [values, setValues] = useState([ProductCategory.A, ProductCategory.B, ProductCategory.C]);
  useEffect(() => {
    onChange(values);
  }, [values]);

  return (
    <div className={'product-categories-group'}>
      <Text>Товары:</Text>

      <div className={'product-categories-checkboxes'}>
        {productCategories.map((item) => (
          <Checkbox
            key={item.key}
            disabled={false}
            className={item.color}
            onChange={(e) =>
              e.target.checked
                ? setValues((prev) => [...prev, item.key])
                : setValues((prev) => prev.filter((p) => p !== item.key))
            }
            checked={Boolean(values.find((v) => v === item.key))}
          >
            {item.value}
          </Checkbox>
        ))}
      </div>

      {needSelectAll && (
        <div className={'product-categories-checkbox-with-divider'}>
          <Checkbox
            disabled={false}
            className="blue"
            onChange={(e) =>
              e.target.checked ? setValues([ProductCategory.A, ProductCategory.B, ProductCategory.C]) : setValues([])
            }
            checked={values.length === productCategories.length}
          >
            Все
          </Checkbox>
        </div>
      )}
    </div>
  );
};
