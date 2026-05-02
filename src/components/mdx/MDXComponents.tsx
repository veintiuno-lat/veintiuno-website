import type {
  AnchorHTMLAttributes,
  BlockquoteHTMLAttributes,
  HTMLAttributes,
  ImgHTMLAttributes,
  OlHTMLAttributes,
  ReactElement,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";

type CodeChild = ReactElement<HTMLAttributes<HTMLElement>>;

export const mdxComponents = {
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className='text-5xl md:text-6xl text-gray-900 mb-8 leading-tight' {...props} />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className='text-4xl md:text-5xl text-gray-900 mb-8 mt-16 leading-tight border-b border-gray-100 pb-6'
      {...props}
    />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className='text-3xl md:text-4xl text-bitcoin mb-6 mt-12 leading-tight' {...props} />
  ),
  h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className='text-2xl md:text-3xl text-gray-900 mb-4 mt-8 leading-tight' {...props} />
  ),
  h5: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h5 className='text-xl md:text-2xl text-gray-900 mb-3 mt-6 leading-tight' {...props} />
  ),
  h6: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h6 className='text-lg md:text-xl text-gray-900 mb-3 mt-4 leading-tight' {...props} />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className='text-gray-700 leading-relaxed mb-6 text-lg' {...props} />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul className='space-y-3 mb-8 ml-6' {...props} />
  ),
  ol: (props: OlHTMLAttributes<HTMLOListElement>) => (
    <ol className='space-y-3 mb-8 ml-6' {...props} />
  ),
  li: (props: HTMLAttributes<HTMLLIElement>) => (
    <li className='text-gray-700 leading-relaxed text-lg relative pl-2'>
      <span className='absolute -left-6 top-0 text-bitcoin font-medium'>•</span>
      {props.children}
    </li>
  ),
  blockquote: (props: BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className='border-l-4 border-bitcoin pl-8 pr-4 py-6 my-8 bg-gray-50 rounded-r-xl italic text-gray-700 text-lg leading-relaxed'
      {...props}
    />
  ),
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code
      className='bg-gray-100 px-3 py-1 rounded-md text-sm font-mono text-bitcoin border border-custom-border'
      {...props}
    />
  ),
  pre: (props: HTMLAttributes<HTMLPreElement>) => {
    const childProps = (props.children as CodeChild | undefined)?.props;
    return (
      <pre className='bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto mb-8 border border-custom-border shadow-minimal'>
        <code className='text-sm font-mono leading-relaxed' {...childProps} />
      </pre>
    );
  },
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className='text-bitcoin hover:text-bitcoin-dark underline decoration-2 underline-offset-2 transition-colors duration-200 font-medium'
      {...props}
    />
  ),
  strong: (props: HTMLAttributes<HTMLElement>) => (
    <strong className='font-bold text-gray-900' {...props} />
  ),
  em: (props: HTMLAttributes<HTMLElement>) => (
    <em className='italic text-gray-800' {...props} />
  ),
  hr: (props: HTMLAttributes<HTMLHRElement>) => (
    <hr className='border-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-12' {...props} />
  ),
  table: (props: TableHTMLAttributes<HTMLTableElement>) => (
    <div className='overflow-x-auto my-8'>
      <table className='min-w-full border border-custom-border rounded-lg overflow-hidden' {...props} />
    </div>
  ),
  thead: (props: HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className='bg-gray-50' {...props} />
  ),
  tbody: (props: HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className='divide-y divide-gray-200' {...props} />
  ),
  tr: (props: HTMLAttributes<HTMLTableRowElement>) => (
    <tr className='hover:bg-gray-50 transition-colors duration-150' {...props} />
  ),
  th: (props: ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className='px-6 py-4 text-left text-bolt-sm text-gray-900 border-b border-custom-border' {...props} />
  ),
  td: (props: TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className='px-6 py-4 text-sm text-gray-700' {...props} />
  ),
  img: (props: ImgHTMLAttributes<HTMLImageElement>) => (
    <img className='rounded-xl shadow-minimal-lg my-8 w-full' {...props} />
  ),
};
