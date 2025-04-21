import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import useCounter from '../hooks/useCounter';
import useFetch from '../hooks/useFetch';

const HooksTest = () => {
  // 使用自定义useState Hook
  const { count, increment, decrement, reset } = useCounter(0);
  
  // 普通的useState示例
  const [text, setText] = useState('');
  
  // 使用自定义useEffect Hook
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/todos/1');
  
  // 普通的useEffect示例
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // 组件挂载时执行
    console.log('组件已挂载');
    
    // 设置初始窗口宽度
    setWindowWidth(window.innerWidth);
    
    // 添加窗口大小变化监听器
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    // 清理函数 - 组件卸载时执行
    return () => {
      console.log('组件将卸载');
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 空依赖数组表示只在挂载和卸载时执行
  
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">React Hooks 测试页面</h1>
        
        <div className="mb-8 p-4 border rounded shadow-sm">
          <h2 className="text-xl font-semibold mb-4">useState 测试</h2>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">自定义 useCounter Hook</h3>
            <div className="flex items-center space-x-4">
              <button 
                onClick={decrement}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                减少
              </button>
              <span className="text-xl">{count}</span>
              <button 
                onClick={increment}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                增加
              </button>
              <button 
                onClick={reset}
                className="px-3 py-1 bg-gray-500 text-white rounded"
              >
                重置
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">基本 useState</h3>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border rounded px-2 py-1 mr-2"
              placeholder="输入一些文字..."
            />
            <p className="mt-2">你输入的文字: {text || '(空)'}</p>
          </div>
        </div>
        
        <div className="mb-8 p-4 border rounded shadow-sm">
          <h2 className="text-xl font-semibold mb-4">useEffect 测试</h2>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">自定义 useFetch Hook</h3>
            {loading && <p>加载中...</p>}
            {error && <p className="text-red-500">错误: {error}</p>}
            {data && (
              <div>
                <p><strong>标题:</strong> {data.title}</p>
                <p><strong>完成状态:</strong> {data.completed ? '是' : '否'}</p>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">基本 useEffect</h3>
            <p>当前窗口宽度: {windowWidth}px</p>
            <p className="text-sm text-gray-500 mt-1">调整浏览器窗口大小查看效果</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HooksTest;