import html from "rehype-stringify"
import markdown from "remark-parse"
import remark2rehype from "remark-rehype"
import unified from "unified"
import { Node, Parent } from "unist"

const parser = unified().use(markdown)

const transformer = unified().use(remark2rehype)

const stringifier = unified().use(html)

export const transformMarkdown = (md: string): string => {
  const root = parser.parse(md) as Parent
  const collections = root.children
    .reduce(
      (collections, element) => {
        if (
          element.type === "paragraph" &&
          (element as Parent).children.length === 1 &&
          (element as Parent).children[0].type === "image"
        ) {
          collections.push([(element as Parent).children[0]], [])
        } else {
          collections[collections.length - 1].push(element)
        }
        return collections
      },
      [[]] as Node[][]
    )
    .filter(collection => collection.length !== 0)
    .map(collection => {
      if (collection.length === 1 && collection[0].type === "image") {
        return `<mj-image src="${collection[0].url}" alt="${collection[0].alt}" />`
      } else {
        return `<mj-text>${stringifier.stringify(
          transformer.runSync({ type: "root", children: collection })
        )}</mj-text>`
      }
    })
    .join("")

  return collections
}
