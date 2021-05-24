import React from 'react';
import { connect } from 'umi';
import { PageHeader } from 'antd';
import ContainerTable from './containerTable';


class ContainerManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  initData = async () => {
    await this.setState({ loading: true });
    await this.setState({ loading: false });
  }

  componentDidMount() {
    this.initData().then()
  }

  render() {

    const renderPageHeader = () => {
      return <div>
        <PageHeader title={'容器管理'}
                    subTitle={'在此管理Docker容器生命周期'}
        />
      </div>
    }

    return <div>
      { renderPageHeader() }
      <ContainerTable />
    </div>

  }

}

function mapStateToProps({ globalModel }) {
  const { dockerImageList } = globalModel;
  return { dockerImageList };
}

export default connect(mapStateToProps)(ContainerManager);
