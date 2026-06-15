export default function Orders() {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl font-bold text-gray-800 mb-6">我的工单</h1>
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <div className="text-5xl mb-4">📋</div>
        <p className="text-sm">暂无进行中的工单</p>
        <p className="text-xs mt-1 text-gray-300">从技能广场或需求广场开始探索吧</p>
      </div>
    </div>
  );
}
