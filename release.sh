if [ ! -d dist ];then
  echo "没发现dist文件夹！"
else
  echo "存在dist文件夹，正在删除..."
  rm dist -rf
  echo "dist文件夹已删除！"
fi

echo "开始构建..."
npm run build
echo "构建完成！"

echo "前往sagittaria.github.io清除旧版文件..."
cd ../sagittaria.github.io
rm static -rf
rm index.html
rm favicon.ico
echo "旧版文件已清除！"

echo "正在复制新版文件..."
cp -r ../stack/dist/static static
cp ../stack/dist/index.html index.html
cp ../stack/dist/favicon.ico favicon.ico
echo "新版文件复制完毕！"

echo "正在提交变更..."
git add . > /dev/null 2>&1
git commit -m `date '+%Y%m%d%H%M%S'` > /dev/null 2>&1
echo "变更提交完成！"

echo "正在发布..."
echo "新版本发布完成！"

echo "正在清理dist文件夹..."
rm ../stack/dist -rf
echo "dist文件夹已清理！"