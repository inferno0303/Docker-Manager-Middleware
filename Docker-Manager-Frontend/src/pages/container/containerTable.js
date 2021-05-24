import React from 'react';
import { connect } from 'umi';
import { Button, Input, Popconfirm, Table, Tooltip, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import style from './containerTable.less';

class ContainerTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '#',
        dataIndex: 'key',
        key: 'key',
        width: 55,
        render: text => <span>{text + 1}</span>,
      },
      {
        title: '容器ID',
        dataIndex: 'container_id',
        key: 'container_id',
        width: 300,
      },
      {
        title: '容器名称',
        dataIndex: 'container_name',
        key: 'container_name',
        width: 120,
      },
      {
        title: '镜像大小',
        dataIndex: 'image_size',
        key: 'image_size',
        width: 120,
        render: text => <span>{(Number(text) / 1000000).toFixed(2)}MB</span>
      },
      {
        title: '镜像ID（SHA256）',
        dataIndex: 'image_id',
        key: 'image_id',
        width: 180,
        ellipsis: { showTitle: false },
        render: text => (
          <Tooltip placement='topLeft' title={text}>
            {text}
          </Tooltip>
        )
      },
      {
        title: '状态',
        dataIndex: 'image_tag',
        key: 'image_tag',
        width: 120,
        render: text => <span>正在运行</span>
      },
      {
        title: '操作',
        key: 'action',
        fixed: 'right',
        render: record => <div>
          <Button type='link'>运行容器</Button>
          <Button type='link' onClick={this.onSave.bind(this, record)}>保存镜像</Button>
          <Popconfirm title={`确认删除镜像「${record?.image_name}:${record?.image_tag}」吗？`}
                      onConfirm={this.onDelete.bind(this, record)}
                      okText="确定"
                      okButtonProps={{ danger: true }}
                      cancelText="取消"
                      placement="rightBottom"
          >
            <Button type='link' style={{color: 'red'}}>删除镜像</Button>
          </Popconfirm>
        </div>
      }
    ];
    this.state = {
      dataLoading: false,
      tableWidth: 'max-content',
      uploadModalVisible: true
    };
  }

  // handle
  uploadModalVisible = () => {
    this.setState({ uploadModalVisible: true })
  }
  uploadModalHide = () => {
    this.setState({ uploadModalVisible: false })
  }

  onDelete = async record => {
    await this.setState({ dataLoading: true });
    await this.props.dispatch({type: 'globalModel/removeImage', payload: { image_name: record.image_name, image_tag: record.image_tag, image_id: record.image_id } })
    message.success(`已删除镜像「${record.image_name}:${record.image_tag}」`)
    await this.setState({ dataLoading: false });
  }

  onSave = async record => {
    await this.setState({ dataLoading: true });
    await this.props.dispatch({type: 'globalModel/saveImage', payload: { image_name: record.image_name, image_tag: record.image_tag, image_id: record.image_id } })
    await this.setState({ dataLoading: false });
  }

  initData = async () => {
    await this.setState({ dataLoading: true });
    await this.props.dispatch({ type: 'containerModel/getContainerList'});
    await this.setState({ dataLoading: false });
  };

  componentWillMount() {
    this.initData().then()
  }

  render() {

    const renderActionBar = () => {
      return <div className={style.action_bar_box}>
        <Button type="primary" onClick={this.uploadModalVisible} icon={<PlusOutlined />}>上传镜像</Button>
      </div>
    }

    const renderTable = () => {
      return <Table columns={this.columns}
                    dataSource={this.props.containerList}
                    loading={this.state.dataLoading}
                    bordered
                    sticky
      />
    }

    return <div>
      { renderActionBar() }
      { renderTable() }
    </div>
  }

}

function mapStateToProps(state) {
  const { containerList } = state.containerModel;
  return { containerList };
}

export default connect(mapStateToProps)(ContainerTable)
