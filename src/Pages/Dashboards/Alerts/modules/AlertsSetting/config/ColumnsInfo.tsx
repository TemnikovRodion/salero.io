import { Text } from '@/Components/_Common';
import { AlertSettingModel } from '@/Models/Contract';
import { DescriptionType } from '@/Models/Enums';
import { Checkbox, Input, Row } from 'antd';
import { ColumnsType } from 'antd/lib/table';

export function useAlertsSettingColumnsInfo(
  onAlertSettingChange: (data: AlertSettingModel) => void,
): ColumnsType<AlertSettingModel> {
  return [
    {
      title: 'Уведомить когда',
      width: 400,
      dataIndex: 'description',
      render: (value, data) => {
        return (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, auto)',
              justifyContent: 'flex-start',
              alignItems: 'center',
              columnGap: '10px',
            }}
          >
            <span>{value}</span>
            {data.description_type !== DescriptionType.ProductEnd && (
              <>
                <Input
                  maxLength={2}
                  value={data.condition}
                  style={{ maxWidth: 50 }}
                  onBlur={(e) =>
                    onAlertSettingChange({
                      ...data,
                      condition: Number(e.target.value),
                    })
                  }
                />
                <span>{data.description_type === DescriptionType.ProductEndSoon ? ' дней' : ' %'}</span>
              </>
            )}
          </div>
        );
      },
    },
    {
      title: 'В личный кабинет',
      dataIndex: 'sendInProfile',
      width: 70,
      align: 'center',
      render: (value, data) => {
        return (
          <Row justify="center">
            <Checkbox
              checked={value}
              onChange={(e) =>
                onAlertSettingChange({
                  ...data,
                  sendInProfile: e.target.value,
                })
              }
            />
          </Row>
        );
      },
    },
    {
      title: 'На e-mail',
      dataIndex: 'sendInEmail',
      width: 70,
      align: 'center',
      render: (value, data) => {
        return (
          <Row justify="center">
            <Checkbox
              checked={value}
              onChange={(e) =>
                onAlertSettingChange({
                  ...data,
                  sendInEmail: e.target.value,
                })
              }
            />
          </Row>
        );
      },
    },
  ];
}
