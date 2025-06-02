# Private Viewing Request Manager

A responsive web application built with React, TypeScript, and Radix UI for managing private property viewing requests.

## Features

- **Dynamic Avatar Loading**: Lazy-loaded user avatars with spinner indicators
- **Responsive Design**: Adapts to different screen sizes with flexible layouts
- **Sticky Navigation**: Persistent user banner that stays visible while scrolling
- **Modern UI**: Built with Radix UI components for consistent design
- **Type Safety**: Full TypeScript support with strict type checking

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety and development experience
- **Vite** - Fast build tool and development server
- **Radix UI** - Component library and design system
- **Zustand** - State management
- **ESLint** - Code linting and formatting

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── data/          # JSON data files
├── stores/        # Zustand state management
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── assets/        # Static assets (images, etc.)
```

## UX Workflow

### Overview

The Private Viewing Request Manager provides a streamlined workflow for both potential tenants and property managers to coordinate property viewings efficiently.

### User Roles & Perspectives

#### **Property Manager Flow**

1. **Request Settings**: Configure viewing availability and operational parameters:
   - Toggle private viewing requests on/off with master switch
   - Select available days of the week for viewings
   - Set viewing time windows (from/to hours)
   - Define time slot duration intervals
2. **Request Overview**: View all incoming viewing requests in a centralized dashboard
3. **Request Management**:
   - **Approve**: Accept a viewing request
     - Automatically books the time slot
     - Removes all other pending requests from the same user
     - Removes conflicting requests for the same date/time from other users
   - **Refuse**: Decline a viewing request
     - Removes the specific request
     - Slot becomes available for other users
4. **Status Monitoring**: Track all approved bookings and their details

#### **Potential Tenant Flow**

1. **User Selection**: Choose their profile from the available tenant options
2. **Time Slot Selection**:
   - View available time slots for property viewings
   - Select up to 3 preferred time slots (per-user limit)
   - Booked slots are visually disabled with line-through styling
   - Selected slots are highlighted in blue
3. **Request Submission**: Submit viewing requests for selected time slots
4. **Status Tracking**: Monitor request status (Pending, Approved, or Booked)
5. **Confirmation View**:
   - See approved booking details in green confirmation panel
   - View property manager contact information (name, phone, email)
   - Access property details and viewing instructions

### Key Features & Behaviors

#### **Smart Slot Management**

- **Per-User Limits**: Each user can select up to 3 time slots independently
- **Conflict Resolution**: When a slot is approved, all conflicting requests are automatically removed
- **Visual Indicators**:
  - Available slots: Gray outline buttons
  - Selected slots: Blue solid buttons
  - Booked slots: Gray with line-through text, disabled state
  - Limit reached: Reduced opacity when user has 3 selections

#### **Request State Management**

- **Pending**: Initial state when tenant submits request
- **Booked**: Final state when property manager approves request
- **Refused**: Request declined by property manager (slot removed)

#### **Data Persistence**

- User preferences and selections are stored locally
- State persists across browser sessions
- Real-time updates reflect changes from property management actions

### User Experience Highlights

1. **Intuitive Interface**: Clean, modern design with clear visual hierarchy
2. **Responsive Design**: Works seamlessly across desktop and mobile devices
3. **Real-time Feedback**: Immediate visual updates when selecting or managing slots
4. **Clear Communication**: Property manager contact details readily available upon approval
5. **Efficient Workflow**: Streamlined process reduces back-and-forth communication
6. **Conflict Prevention**: Automatic handling of scheduling conflicts and user limits

### Technical UX Considerations

- **Performance**: Lazy-loaded avatars and optimized rendering
- **Accessibility**: Proper color contrast and interactive element states
- **Error Prevention**: Smart validation prevents invalid slot selections
- **State Synchronization**: Consistent data across all user interfaces
- **Local Storage**: Persistent user experience across sessions
