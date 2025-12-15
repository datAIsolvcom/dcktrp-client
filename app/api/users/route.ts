import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8012';

    try {
        const body = await request.json();
        const adminToken = request.headers.get('x-admin-token');

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        // Add admin token as Authorization header if provided
        if (adminToken) {
            headers['Authorization'] = `Bearer ${adminToken}`;
        }

        // Forward to backend
        const response = await fetch(`${backendUrl}/users/`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        });

        const data = await response.json();

        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('User registration proxy error:', error);
        return NextResponse.json(
            { detail: 'Registration failed' },
            { status: 500 }
        );
    }
}
