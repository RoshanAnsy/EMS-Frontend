import React from "react";
import Link from "next/link";
import { RelatedArticlesTypes } from "@/types/article";
import { Card } from "../ui/card";
import Image from "next/image";
import dayjs from "dayjs";
import { Button } from "../ui/button";
import { Timer } from 'lucide-react';
interface SuggestedArticlesProps {
  relatedArticles: RelatedArticlesTypes[];
}

const SuggestedArticles: React.FC<SuggestedArticlesProps> = ({ relatedArticles }) => {
  return (
    <Card className=" p-4   border-none bg-neutral-100 text-articles-text-color">
      <div className=" opacity-100">
        <h2 className="text-xl font-semibold mb-4">Related Articles</h2>
        <div className="flex flex-col gap-4 ">
          {relatedArticles.length > 0 ? (
            relatedArticles.map((article, index) => (
              <div  key={index} className="block p-4 rounded-xl border   bg-white ">
                {article.thumbnail !=null && article.thumbnail != '' 
                            ? <Image
                            src={`${article?.thumbnail != null ? `${article.thumbnail}` : ""}`}
                            alt={article.title}
                            width={120}
                            height={67}
                            className="w-full border rounded-xl mb-2   object-cover"
                            />:<div/> }
                
                <h2 className="text-lg font-semibold truncate w-full overflow-hidden whitespace-nowrap">
                  {article.title.length > 20 ? article.title.substring(0, 20) + "..." : article.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                {article.description.length > 100 ? article.description.substring(0, 100) + "..." : article.description}
                </p>
               <div className=" m-2 my-3"><p className="bg-indigo-50 text-center text-sm border text-bgg-tags px-1 py-[1px] rounded inline-block">{article.tags.length> 0 ? article.tags[0]:""}</p></div>
                <div className="flex justify-between items-center">
                <Link href={`/articles/${article.id}`}  className=" ">
                  <Button variant="ghost" size="sm" className=" cursor-pointer border rounded-full px-5 text-bgg-tags">READ</Button></Link>
                  <p className=" flex items-center gap-x-2 text-text-color opacity-60">
                    <span><Timer className=" h-4 w-4"/></span>
                     {dayjs(article.createdAt).format("MMM DD, YYYY")}</p>
                </div>
                
              </div>
            ))
          ) : (
            <p className="text-gray-500">No related articles found.</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SuggestedArticles;
