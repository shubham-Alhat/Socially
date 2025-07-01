import CreatePost from "@/components/ui/CreatePost";
import PostCard from "@/components/ui/PostCard";
import WhoToFollow from "@/components/ui/WhoToFollow";
import { currentUser } from "@clerk/nextjs/server";
import { getAllPosts } from "@/actions/post.action";
import { getDbUserId } from "@/actions/user.action";

export default async function Home() {
  const user = await currentUser();
  const posts = await getAllPosts();
  const dbUserId = await getDbUserId();

  console.log(posts);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-6">
          {user ? <CreatePost /> : null}
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} dbUserId={dbUserId} />
            ))}
          </div>
        </div>
        <div className="hidden lg:block lg:col-span-4 sticky top-20">
          <WhoToFollow />
        </div>
      </div>
    </>
  );
}
