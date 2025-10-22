import { Injectable } from '@angular/core';
import { AuthResponse, createClient, OAuthResponse } from '@supabase/supabase-js';
import { environment } from '../environments/environment.development';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

  register(
    email: string,
    password: string,
    name: string
  ): Observable<AuthResponse> {
    const promise = this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });
    return from(promise)
  }

  signInWithGoogle(): Observable<OAuthResponse> {
  const promise = this.supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: 'http://localhost:4200/'
    },
  });
  return from(promise)
}
}
