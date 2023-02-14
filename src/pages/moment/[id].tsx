import { ArrowLeftIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Comment, Layout, Moment, ThemeToggle } from "@components";
import { CommentData, MomentMetadata } from "@utils/definitions/interfaces";
import { getCommentsByMomentId, mockMoments } from "src/mock/data";

export default function MomentPage() {
  const router = useRouter();
  const [post, setMoment] = useState<MomentMetadata | undefined>(undefined);
  const momentId = router.query.id as string;
  const [comments, setComments] = useState<Array<CommentData>>([]);

  useEffect(() => {
    setComments(getCommentsByMomentId(momentId) || []);
  }, [momentId]);

  useEffect(() => {
    const displayMomentId = mockMoments.findIndex((m) => m.id === momentId);
    setMoment(mockMoments[displayMomentId]);
  }, [momentId]);

  return (
    <>
      <Layout>
        <div className="xl:ml-[370px] border-l border-r border-primary xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
          <div className="flex py-2 px-3 sticky top-0 z-50 bg-base-200 border-primary">
            <div className="hoverEffect" onClick={() => router.back()}>
              <ArrowLeftIcon className="rounded-full h-9 w-9 hoverEffect p-2 hover:bg-primary" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold my-auto">Moment</h2>
            <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
              {/* <SparklesIcon className="h-5" /> */}
              <ThemeToggle />
            </div>
          </div>
          {post && <Moment moment={post} />}
          {comments.length > 0 && (
            <AnimatePresence>
              {comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <Comment key={comment.id} comment={comment} originalPostId={momentId} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </Layout>
    </>
  );
}
