# React Hooks 测试模块

这个目录包含了用于测试和展示React Hooks功能的自定义hooks。

## 可用的Hooks

### useCounter

一个简单的计数器Hook，用于演示useState的基本用法。

```jsx
const { count, increment, decrement, reset } = useCounter(initialValue);
```

### useFetch

一个数据获取Hook，用于演示useEffect的基本用法。

```jsx
const { data, loading, error } = useFetch(url);
```

## 测试页面

可以通过访问 `/hooks-test` 路由来查看这些hooks的实际使用效果。该页面展示了：

1. useState的基本用法和自定义hook实现
2. useEffect的基本用法和自定义hook实现

## 使用方法

```jsx
import useCounter from '../hooks/useCounter';
import useFetch from '../hooks/useFetch';

function MyComponent() {
  const { count, increment } = useCounter(0);
  const { data, loading } = useFetch('https://api.example.com/data');
  
  // 使用这些hooks...
}
```