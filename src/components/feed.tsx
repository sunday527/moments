import { Moment, ThemeToggle } from "@components";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { MomentMetadata } from "@utils/definitions/interfaces";
import { useWalletProvider } from "src/hooks/use-wallet-provider";
import { mockMoments } from "src/mock/data";

export const Feed = () => {
  const [posts, setPosts] = useState<Array<MomentMetadata>>(mockMoments);
  const { address } = useWalletProvider();
  const [showMine, setShowMine] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("submit") === "1") {
      setShowMine(true);
    }
  }, []);
  return (
    <div className="xl:ml-[370px] border-l border-r border-primary xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-base-200 border-primary">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer my-auto">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          {/* <SparklesIcon className="h-5" /> */}
          <ThemeToggle />
        </div>
      </div>
      {/* <Input /> */}
      <AnimatePresence>
        <motion.div
          key={"0"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {showMine && (
            <Moment
              key={"0"}
              moment={{
                id: "0",
                address: address || "",
                userImg: "https://img2.baidu.com/it/u=3350495368,4002328331&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                username: "JoJo",
                timestamp: new Date().toLocaleString(),
                text: "hello",
                media: "https://img0.baidu.com/it/u=60996219,4002865036&fm=253&fmt=auto&app=138&f=JPEG?w=780&h=442",
                mediaType: "image",
              }}
            />
          )}
        </motion.div>
        {posts?.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Moment key={post.id} moment={post} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
