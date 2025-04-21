/**
 * 自定义数据获取Hook
 * 演示useEffect的基本用法
 */
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message || 'Something went wrong');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }

    // 清理函数
    return () => {
      // 如果需要取消请求，可以在这里实现
    };
  }, [url]); // 依赖项数组，当url变化时重新执行

  return { data, loading, error };
};

export default useFetch;