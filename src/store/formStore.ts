import { create } from 'zustand'

interface FormState {
  formData: {
    members: string
    ig: string
    fb: string
    others: string
    text1: string
    text2: string
    text3: string
    captureimg1: string
    captureimg1File: File | null
    captureimg2: string
    captureimg2File: File | null
    captureimg3: string
    captureimg3File: File | null
    descimg1: string
    descimg2: string
    descimg3: string
    logo?: string
    logoFile?: File | null
  }
  updateForm: (data: Partial<FormState['formData']>) => void
}

interface ReviewState {
  reviewData: {
    profile: string,
    profileFile: File | null,
    nick: string,
    gen: string,
    contact: string,
    content: string
  }
  updateReview: (data: Partial<ReviewState['reviewData']>) => void
}

export const useFormStore = create<FormState>((set) => ({
  formData: {
    members: '',
    ig: '',
    fb: '',
    others: '',
    text1: '',
    text2: '',
    text3: '',
    captureimg1: '',
    captureimg1File: null,
    captureimg2: '',
    captureimg2File: null,
    captureimg3: '',
    captureimg3File: null,
    descimg1: '',
    descimg2: '',
    descimg3: '',
    logo: '',
    logoFile: null
  },

  updateForm: (data) => set((state) => ({
    formData: { ...state.formData, ...data }
  }))
}))

export const useReviewStore1 = create<ReviewState>((set) => ({
  reviewData: {
    profile: '',
    profileFile: null,
    nick: '',
    gen: '',
    contact: '',
    content: ''
  },

  updateReview: (data) => set((state) => ({
    reviewData: { ...state.reviewData, ...data }
  }))
}))

export const useReviewStore2 = create<ReviewState>((set) => ({
  reviewData: {
    profile: '',
    profileFile: null,
    nick: '',
    gen: '',
    contact: '',
    content: ''
  },

  updateReview: (data) => set((state) => ({
    reviewData: { ...state.reviewData, ...data }
  }))
}))

export const useReviewStore3 = create<ReviewState>((set) => ({
  reviewData: {
    profile: '',
    profileFile: null,
    nick: '',
    gen: '',
    contact: '',
    content: ''
  },

  updateReview: (data) => set((state) => ({
    reviewData: { ...state.reviewData, ...data }
  }))
}))
