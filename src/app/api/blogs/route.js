// src/app/api/blogs/route.js

import { NextResponse } from 'next/server';
import {
  getBlogs,
  getBlogById,
  getBlogBySlug,
  getBlogsByTag,
} from '../../../lib/getBlogs';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');
    const tag = searchParams.get('tag');
    const featured = searchParams.get('featured');
    const limitParam = searchParams.get('limit');
    const limit = limitParam
      ? isNaN(parseInt(limitParam))
        ? 0
        : parseInt(limitParam)
      : 0;

    let blogs;

    if (id) {
      const blog = await getBlogById(id);
      if (!blog) {
        return NextResponse.json(
          { error: 'Blog nije pronađen' },
          { status: 404 }
        );
      }
      return NextResponse.json(blog, {
        headers: {
          'Cache-Control':
            'public, max-age=86400, stale-while-revalidate=604800',
        },
      });
    } else if (slug) {
      const blog = await getBlogBySlug(slug);
      if (!blog) {
        return NextResponse.json(
          { error: 'Blog nije pronađen' },
          { status: 404 }
        );
      }
      return NextResponse.json(blog, {
        headers: {
          'Cache-Control':
            'public, max-age=86400, stale-while-revalidate=604800',
        },
      });
    } else if (tag) {
      blogs = await getBlogsByTag(tag);
    } else {
      blogs = await getBlogs();
      if (featured === 'true') {
        blogs = blogs.filter((blog) => blog.featured);
      }
    }

    if (limit > 0 && blogs.length > limit) {
      blogs = blogs.slice(0, limit);
    }

    return NextResponse.json(blogs, {
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('API greška:', error);
    return NextResponse.json(
      { error: 'Greška prilikom dohvatanja blogova' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
