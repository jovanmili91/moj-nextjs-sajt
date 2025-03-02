// C:\Users\jovan\projektikuce-novi\src\app\api\projects\route.js

import { NextResponse } from 'next/server';
import {
  getProjects,
  getProjectById,
  getProjectsByCategory,
} from '../../../lib/getProjects';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limitParam = searchParams.get('limit');
    const limit = limitParam
      ? isNaN(parseInt(limitParam))
        ? 0
        : parseInt(limitParam)
      : 0;

    let projects;

    if (id) {
      const project = await getProjectById(id);
      if (!project) {
        return NextResponse.json(
          { error: 'Projekat nije pronađen' },
          { status: 404 }
        );
      }
      return NextResponse.json(project, {
        headers: {
          'Cache-Control':
            'public, max-age=86400, stale-while-revalidate=604800',
        },
      });
    } else if (category) {
      projects = await getProjectsByCategory(category);
    } else {
      projects = await getProjects();
      if (featured === 'true') {
        projects = projects.filter((project) => project.featured);
      }
    }

    if (limit > 0 && projects.length > limit) {
      projects = projects.slice(0, limit);
    }

    return NextResponse.json(projects, {
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('API greška:', error);
    return NextResponse.json(
      { error: 'Greška prilikom dohvatanja projekata' },
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
