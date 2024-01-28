import React from 'react';
import {ConfigProvider, Select, SelectProps, Space} from "antd";
import {SortSelectProps} from "@types";

const SortSelect: React.FC<SortSelectProps & SelectProps<string>> =
    ({
         onSelect,
         onChange,
         defaultValue,
         ...selectProps
     }) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Select: {
                        optionFontSize: 24,
                    },
                },
            }}
        >
            <Space align="end" direction="vertical" className="w-full my-5">
                <Select
                    defaultValue={defaultValue}
                    size="large"
                    style={{ width: 180, height: 60 }}
                    onChange={onChange}
                    onSelect={onSelect}
                    {...selectProps}
                >
                    <Select.Option value="sort" disabled>
                        Сортировка
                    </Select.Option>
                    <Select.Option value="asc">A-Z</Select.Option>
                    <Select.Option value="desc">Z-A</Select.Option>
                </Select>
            </Space>
        </ConfigProvider>
    );
};

export default SortSelect;