'use client';
import { Button,Layout,Menu } from 'antd';
import { useRouter } from 'next/navigation';

const { Header, Content, } = Layout;





export default function HeaderPage({children}) {
    const router=useRouter();
    const items=[
        {
            key:'home',
            label:"Homepage"
        },
        {
            key:'login',
            label:"Login",
            onClick:()=>{router.push('/login')}
        }
    ]
    return (
        <Layout>
        <Header style={{ display: 'flex', alignItems: 'center',background:'white'}}>
        <div className="demo-logo" />
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['home']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
     
    
      </Header>
      <Content>
        {children}
        </Content>
      </Layout>
    );
  }
  