import style from 'styles/docs/index.module.scss';
import { useRouter } from 'next/router';
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';

import { RouterPage } from 'components/Docs/routerPage';
import { useSpring, animated } from 'react-spring';

const treeData = [
  {
    title: '服务器指令',
    key: '0-0',
    children: [
      {
        title: '介绍',
        key: 'introduce',
      },
      // {
      //     title: 'parent 1-1',
      //     key: '0-0-1',
      //     children: [
      //         {
      //             title: 'leaf',
      //             key: '0-0-1-0',
      //         },
      //     ],
      // },
      // {
      //     title: 'parent 1-2',
      //     key: '0-0-2',
      //     children: [
      //         {
      //             title: 'leaf',
      //             key: '0-0-2-0',
      //         },
      //         {
      //             title: 'leaf',
      //             key: '0-0-2-1',
      //         },
      //     ],
      // },
    ],
  },
];

export default function Page() {
  const router = useRouter();
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });

  const onSelect = (selectedKeys, info) => {
    if (selectedKeys.length === 0) return;
    router.push('/docs/' + info.node.key);
  };

  return (
    <animated.div style={props}>
      <RouterPage query={router.query.slog} />
    </animated.div>
  );
}
